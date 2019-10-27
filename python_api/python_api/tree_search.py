"""

Project NOMAD
Team Nomapp

CopyLeft 2019 Gavin Dove

"""

import falcon
import numpy
import pickle
import json

class Resource(object):

    def on_post(self, req, resp):

        json_data = json.loads(req.stream.read())
        print(json_data)

        U_Rect = numpy.zeros((2,5))
        U_Rect[0,0] = float(json_data["minElevationDistribution"])
        U_Rect[1,0] = float(json_data["maxElevationDistribution"])
        U_Rect[0,1] = float(json_data["minFreshWaterProximity"])
        U_Rect[1,1] = float(json_data["maxFreshWaterProximity"])
        U_Rect[0,2] = float(json_data["minUrbanProximity"])
        U_Rect[1,2] = float(json_data["maxUrbanProximity"])
        U_Rect[0,3] = float(json_data["minArableProximity"])
        U_Rect[1,3] = float(json_data["maxArableProximity"])
        U_Rect[0,4] = float(json_data["minPredictedTempIncrease"])
        U_Rect[1,4] = float(json_data["maxPredictedTempIncrease"])

        resp.body = U_Rect[0,0]
        resp.status = falcon.HTTP_200        
       
        #global myglobal
        #SS = search()
        #Result = SS.radius_search(myglobal, U_Rect)
        
        #data = {'resultIndices': Result}
        #resp.body = json.dumps(data)
        #resp.status = falcon.HTTP_200

class search(object):


    def depickle(self):

        """
        Take pickled spatial tree file from local directory and turn back to
        list of tuples

        """

        file_name = "python_api/Final_Pickle"
        file_object = open(file_name, 'rb')
        FTrees = pickle.load(file_object)

        return FTrees


    def intersect_rects(self, user_hrect, branch_hrect):

        """    
        Check if bounds from user-defined hypercube
        are contained inside current branch's hyper-rectangle

        """

        if ((user_hrect[0, 0] < branch_hrect[1, 0]) and (user_hrect[1, 0] > branch_hrect[0, 0])) and \
                ((user_hrect[0, 1] < branch_hrect[1, 1]) and (user_hrect[1, 1] > branch_hrect[0, 1])) and \
                ((user_hrect[0, 2] < branch_hrect[1, 2]) and (user_hrect[1, 2] > branch_hrect[0, 2])) and \
                ((user_hrect[0, 3] < branch_hrect[1, 3]) and (user_hrect[1, 3] > branch_hrect[0, 3])) and \
                ((user_hrect[0, 4] < branch_hrect[1, 4]) and (user_hrect[1, 4] > branch_hrect[0, 4])):

            return True
        else:
            return False


    def intersect_rect_point(self, point, hrect):

        """
        Check if a point is contained inside a hyper-rectangle

        """

        if (((point[0] < hrect[1,0]) and (point[0] > hrect[0,0])) and ((point[1] < hrect[1,1]) and (point[1] > hrect[0,1]))
            and ((point[2] < hrect[1,2]) and (point[2] > hrect[0,2])) and ((point[3] < hrect[1,3]) and (point[3] > hrect[0,3])) and ((point[4] < hrect[1,4]) and (point[4] > hrect[0,4]))):

            return True

        else:

            return False


    def radius_search(self, tree, input_rect):

        """
        find all points within user-defined hyper-rectangle, return list of 
        matching point ID's

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

        outside = []
        for arr in inside:
            outside.append(arr[5])        

        return outside


api = application = falcon.API()

tree_search = Resource()
S = search()
myglobal = S.depickle()
api.add_route('/tree_search', tree_search)