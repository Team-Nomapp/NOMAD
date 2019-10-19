using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SpaceAppsAPI.Models
{
    public class LivingPreferences
    {
        public float MinElevationDistribution { get; set; }
        public float MaxElevationDistribution { get; set; }
        public float MinFreshWaterProximity { get; set; }
        public float MaxFreshWaterProximity { get; set; }
        public float MinUrbanProximity { get; set; }
        public float MaxUrbanProximity { get; set; }
        public float MinPredictedTempIncrease { get; set; }
        public float MaxPredictedTempIncrease { get; set; }
        public int SelectedLandCover { get; set; }

    }
}