"""

Project NOMAD
Team Nomapp

CopyLeft 2019 Gavin Dove


"""

import numpy
import pickle
import json


def intersect_rects(user_hrect, branch_hrect):

    """    
    Check if bounds from user-defined hypercube
    are contained inside current branch's hyper-rectangle

    """

    if ((user_hrect[0,0] < branch_hrect[1,0]) and (user_hrect[1,0] > branch_hrect[0,0])) and \
        ((user_hrect[0, 1] < branch_hrect[1, 1]) and (user_hrect[1, 1] > branch_hrect[0, 1])) and \
        ((user_hrect[0, 2] < branch_hrect[1, 2]) and (user_hrect[1, 2] > branch_hrect[0, 2])) and \
        ((user_hrect[0, 3] < branch_hrect[1, 3]) and (user_hrect[1, 3] > branch_hrect[0, 3])):

        return True

    else:

        return False


def intersect_rect_point(point, hrect):

    """
    Check if a point is contained inside a hyper-rectangle

    """

    if (((point[0] < hrect[1,0]) and (point[0] > hrect[0,0])) and ((point[1] < hrect[1,1]) and (point[1] > hrect[0,1]))
        and ((point[2] < hrect[1,2]) and (point[2] > hrect[0,2])) and ((point[3] < hrect[1,3]) and (point[3] > hrect[0,3]))):

        return True

    else:

        return False


def radius_search(tree, input_rect):

    """
    find all points within user-defined hyper-rectangle

    """
    stack = [tree[0]]
    inside = []
    while stack:

        leaf_idx, leaf_data, left_hrect, \
                  right_hrect, left, right = stack.pop()

        # leaf
        if leaf_idx is not None:
            count = 0
            Num_Points = leaf_data.shape[1]
            for count in range(Num_Points):
                Current_Point = leaf_data[:,count]
                if intersect_rect_point(Current_Point, input_rect):
                    inside.append(Current_Point)

        else:

            if intersect_rects(input_rect,left_hrect):
                stack.append(tree[left])

            if intersect_rects(input_rect,right_hrect):
                stack.append(tree[right])

    return inside


"""

Read in data from user request formatted as JSON file. JSON maps to dimensions of U_Rect as follows:

Elevation Distribution:             Dimension 1
Fresh Water Proximity:              Dimension 2
Urban Proximity:                    Dimension 3
Predicted Temp Increase:            Dimension 4

Selected Land Cover object to be placed in separate variable.

"""

json_file = open('USER_INPUT.json')
json_string = json_file.read()
json_data = json.loads(json_string)

U_Rect = numpy.zeros((2,4))
U_Rect[0,0] = json_data["minElevationDistribution"]
U_Rect[1,0] = json_data["maxElevationDistribution"]
U_Rect[0,1] = json_data["minFreshWaterProximity"]
U_Rect[1,1] = json_data["maxFreshWaterProximity"]
U_Rect[0,2] = json_data["minUrbanProximity"]
U_Rect[1,2] = json_data["maxUrbanProximity"]
U_Rect[0,3] = json_data["minPredictedTempIncrease"]
U_Rect[1,3] = json_data["maxPredictedTempIncrease"]


""""

Read in pickled kd-tree data from tree builder script, as list of tuples.
Extract the point ID for placement in the program output, "Final_Out".
Note that if this list is empty, no points matching the user input request
were found.

"""

file_name = "Tree_Pickle"
file_object = open(file_name, 'rb')
FTrees = pickle.load(file_object)

Out = radius_search(FTrees, U_Rect)

Final_Out = []
for arr in Out:
    Final_Out.append(arr[4])

