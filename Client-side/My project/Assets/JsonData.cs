using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;

[Serializable]
public class JsonData 
{
    public string account_number { get; set; }
    public string first_name { get; set; }
    public string last_name { get; set; }
    public int? age { get; set; }
    public string gender { get; set; }
    public string phone_number { get; set; }
    public string address { get; set; }
    public string bank_account_type { get; set; }
    public string date_of_account_opening { get; set; }  
    public string branch_code { get; set; }
}
