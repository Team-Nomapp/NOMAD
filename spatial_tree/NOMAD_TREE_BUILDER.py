"""

Project NOMAD

CopyLeft 2019 Gavin Dove


"""

import numpy
import pickle


def kdtree(data, leafsize=10):

    """

    Assemble multi-dimensional data points into a kd-tree. Output kd-tree represented by a
    list of tuples. The output kd-tree allows for search of up to 20-dimensional (continuous)
    data for points contained in a user-defined hyper cube. Search complete in O(log n) time.

    Input:

        data:

            Numpy array, organized as follows

                    point_1     point_2     point_3     ...     point_n

            dim_1     X           X           X         ...        X

            dim_2     X           X           X         ...        X

            dim_3     X           X           X         ...        X
              .       .           .           .         ...        .
              .       .           .           .         ...        .
              .       .           .           .         ...        .
            dim_n     X           X           X         ...        X


        leafsize:

            max. number of data points to store in a leaf


    Output:

        kd-tree:

            list of tuples

    """


    # Extract data dimension from input array

    ndim = data.shape[0]
    ndata = data.shape[1]


    # Find bounding hyper-rectangle of data

    hrect = numpy.zeros((2,data.shape[0]))
    hrect[0,:] = data.min(axis=1)
    hrect[1,:] = data.max(axis=1)


    # Create root of kd-tree

    idx = numpy.argsort(data[0,:], kind='mergesort')
    data[:,:] = data[:, idx]
    splitval = data[0, int(ndata/2)]

    left_hrect = hrect.copy()
    right_hrect = hrect.copy()
    left_hrect[1, 0] = splitval
    right_hrect[0, 0] = splitval

    tree = [(None, None, left_hrect, right_hrect, None, None)]

    stack = [(data[:,:int(ndata/2)], idx[:int(ndata/2)], 1, 0, True),
             (data[:,int(ndata/2):], idx[int(ndata/2):], 1, 0, False)]


    # Recursively split data in halves using hyper-rectangles:

    while stack:


        # Pop data off stack

        data, didx, depth, parent, leftbranch = stack.pop()
        ndata = data.shape[1]
        nodeptr = len(tree)


        # Update parent node

        _didx, _data, _left_hrect, _right_hrect, left, right = tree[parent]

        tree[parent] = (_didx, _data, _left_hrect, _right_hrect, nodeptr, right) if leftbranch \
            else (_didx, _data, _left_hrect, _right_hrect, left, nodeptr)


        # Insert node in kd-tree


        # If leaf node, append leaf to tree

        if ndata <= leafsize:
            _didx = didx.copy()
            _data = data.copy()
            leaf = (_didx, _data, None, None, 0, 0)
            tree.append(leaf)


        # If not a leaf, split the data in two, create node, and append to tree

        else:
            splitdim = depth % ndim
            idx = numpy.argsort(data[splitdim,:], kind='mergesort')
            data[:,:] = data[:,idx]
            didx = didx[idx]
            nodeptr = len(tree)
            stack.append((data[:,:int(ndata/2)], didx[:int(ndata/2)], depth+1, nodeptr, True))
            stack.append((data[:,int(ndata/2):], didx[int(ndata/2):], depth+1, nodeptr, False))
            splitval = data[splitdim,int(ndata/2)]
            if leftbranch:
                left_hrect = _left_hrect.copy()
                right_hrect = _left_hrect.copy()
            else:
                left_hrect = _right_hrect.copy()
                right_hrect = _right_hrect.copy()
            left_hrect[1, splitdim] = splitval
            right_hrect[0, splitdim] = splitval
            tree.append((None, None, left_hrect, right_hrect, None, None))


    return tree


# Pickle output list of tuples so it can be stored on disk and read into Python scripts


"""
file_name = "Water_Pickle"
file_object = open(file_name, 'rb')
Urban_Matrix = pickle.load(file_object)

Urban_Matrix_1 = Urban_Matrix[:,1]
Urban_Matrix_1 = Urban_Matrix_1.reshape(1,-1)
Urban_Matrix_2 = Urban_Matrix[:,2]
Urban_Matrix_2 = Urban_Matrix_2.reshape(1,-1)
Urban_Matrix_3 = Urban_Matrix[:,0]
Urban_Matrix_3 = Urban_Matrix_3.reshape(1,-1)

Urban_Matrix_Out = numpy.append(Urban_Matrix_1, Urban_Matrix_2, axis=0)
Urban_Matrix_Out = numpy.append(Urban_Matrix_Out, Urban_Matrix_3, axis=0)

#print(Urban_Matrix_Out.shape)
#print(numpy.amin((Urban_Matrix_Out), axis=1))
#print(numpy.amax(Urban_Matrix_Out, axis=1))

"""

FTrees = kdtree(data2, leafsize=4)

file_name = "Tree_Pickle"
file_object = open(file_name, 'wb')
pickle.dump(FTrees, file_object)
file_object.close()




