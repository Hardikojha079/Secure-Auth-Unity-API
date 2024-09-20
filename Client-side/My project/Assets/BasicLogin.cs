using System.Collections;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Networking;
using TMPro;

public class BasicLogin : MonoBehaviour
{
    [SerializeField] private InputField customerID;
    [SerializeField] private InputField password;
    [SerializeField] private InputField status;
    [SerializeField] private GameObject panel;

    private const string baseURL = "http://localhost:3000/api/v1/BankDetails";
    private const string loginEndpoint = "/login";
    private string authToken;

    public void OnLoginButtonClick()
    {
        if (string.IsNullOrEmpty(customerID.text) || string.IsNullOrEmpty(password.text))
        {
            status.text = "Please fill in all fields.";
            return;
        }

        StartCoroutine(Login(customerID.text, password.text));
    }

    private IEnumerator Login(string customerID, string password)
    {
        string url = baseURL + loginEndpoint;
        var loginData = new LoginRequest { account_number = customerID, password = password};
        string jsonBody = JsonUtility.ToJson(loginData);

        UnityWebRequest webRequest = new UnityWebRequest(url, "POST")
        {
            uploadHandler = new UploadHandlerRaw(System.Text.Encoding.UTF8.GetBytes(jsonBody)),
            downloadHandler = new DownloadHandlerBuffer()
        };

        webRequest.SetRequestHeader("Content-Type", "application/json");

        yield return webRequest.SendWebRequest();

        if (webRequest.result == UnityWebRequest.Result.ConnectionError || webRequest.result == UnityWebRequest.Result.ProtocolError)
        {
            status.text = $"Login Failed: {webRequest.error}";
        }
        else
        {
            var response = JsonUtility.FromJson<LoginResponse>(webRequest.downloadHandler.text);
            if (response.success)
            {
                authToken = response.token; 
                status.text = "Login Successful";
                panel.SetActive(false); 
            }
            else
            {
                status.text = "Invalid credentials. Please try again.";
            }
        }

        webRequest.Dispose();
    }

    [System.Serializable]
    private class LoginRequest
    {
        public string account_number;
        public string password;
    }

    [System.Serializable]
    private class LoginResponse
    {
        public bool success;
        public string token;
    }
}
