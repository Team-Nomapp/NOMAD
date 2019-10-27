import falcon
from .tree_search import Resource

api = application = falcon.API()

tree_search = Resource()
myglobal = 'banana'
api.add_route('/tree_search', tree_search)
