# NOMAD
SpaceApps 2019 Hackathon

Active Demo:        www.nomapp.me


Directory Guide:

spatial_tree    ->      .py files for building and searching spatial trees
python_api      ->      tree search .py files organized for API deployment
seed            ->      seed files for postgres database
app             ->      web app build
api             ->      nodejs api (for serving web app with database)


Introduction:

NOMAD integrates NASA satellite data in a searchable format, so that climate
refugees and nomads can find new homes.

Project NOMAD was built to solve the challenges faced daily by hundreds of
thousands of refugees and nomads. Political unrest, climate change, and
food/water insecurity are among the existential dangers faced by these displaced
persons. In fact, the UN estimates that by 2050, there will be over a billion
climate refugees. Originally concepted to solve the "From Curious Minds Come
Helping Hands" challenge by identifying vulnerable populations with NASA
satellite data, we expanded the scope of our solution to not just identify
vulnerable populations, but also to empower them to find, move, and settle in
new lands when faced with insurmountable challenges at home.

Project NOMAD is a web-based platform that integrates satellite data on land
classification, elevation, estimated climate through 2100, and the position of
fresh water and urban areas, in a searchable and user-friendly environment.
The country of Burundi was selected initially as political unrest has resulted
in over 340,000 internally displaced persons, according to UN estimates. Raster
pixel data from each of the chosen data sources is processed into points, and
from these points, easy-to-understand measures of ‘habitability’ are calculated
(average slope, distance to fresh water, distance to urban areas, distance to
arable land, and estimated temperature increase by 2100). The user can select
their desired values for each of these ‘habitability’ measures, and the web
platform quickly searches through millions of data points to provide the user
with locations that match their chosen values, within their country. The data
is pre-processed into spatial trees to vastly reduce the search time for points
that match the user's criteria, and to enable scalability to large countries/
areas that contain upwards of a billion points, with little performance drop†.
After selecting a location, the user is presented with the raw satellite data
collected from that location, superimposed against an interactive map. The user
interface allows them to browse the other locations that match their desired
measures by using land classification as a filter (ex. Forest, Crop Land,
Herbaceous Grassland).

Project NOMAD uses resources collected from the USGS's and NASA's LP DAAC
portal, and NASA's NEX website. More specifically, Land Classification, Digital
Elevation, and Water Body Classification data were selected from LP DAAC (from
the MODIS and ASTER missions), while Global Warming Temperature Predictions
(Global Daily Downscaled Projections) were collected from the NEX portal.
A shape file of the country of interest, Burundi, was downloaded from a
third-party website, and this was used with NASA's AppEEARS tool to download
all LP DAAC data contained within the borders of Burundi as a single set of
GeoTIFF files. 

†Search of a kd-tree occurs in O log(n) time, where n is the number of points
to search through. Compared to linear search of a million points, Nomad searches
approximately 16,000 times faster. When searching a kd-tree with over a billion
points, Nomad only takes 50% longer than searching through a kd-tree with a
million points. 
