using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SpaceAppsAPI.Models;

namespace SpaceAppsAPI.Controllers
{
    public class SendPreferencesController : ApiController
    {
        [HttpGet]
        public string HttpPostHandler(LivingPreferences livingPreferences)
        {
            return $"Your preferences: " +
                   $"Elevation Distribution: {livingPreferences.MinElevationDistribution} - {livingPreferences.MaxElevationDistribution} | " + 
                   $"Fresh Water Proximity {livingPreferences.MinFreshWaterProximity} - {livingPreferences.MaxFreshWaterProximity} | " + 
                   $"Urban Proximity {livingPreferences.MinUrbanProximity} - {livingPreferences.MaxUrbanProximity} | " + 
                   $"Selected Land Cover {livingPreferences.SelectedLandCover} | " + 
                   $"Predicted Temp Increase{livingPreferences.MinPredictedTempIncrease} - {livingPreferences.MaxPredictedTempIncrease}";
        }
    }
}
