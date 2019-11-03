# import graphene
# from graphene_sqlalchemy import SQLAlchemyObjectType

# class User(SQLAlchemyObjectType):
#     class Meta:
#         model = UserModel
#         # use `only_fields` to only expose specific fields ie "name"
#         # only_fields = ("name",)
#         # use `exclude_fields` to exclude specific fields ie "last_name"
#         # exclude_fields = ("last_name",)

# class Query(graphene.ObjectType):
#     users = graphene.List(User)

#     def resolve_users(self, info):
#         query = User.get_query(info)  # SQLAlchemy query
#         return query.all()

# schema = graphene.Schema(query=Query)