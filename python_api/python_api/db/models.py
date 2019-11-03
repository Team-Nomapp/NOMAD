
# DB_URI = "postgres://crxnqdqu:kInJllQCS3PgB8ISVP8J13nfC9qNiB_E@salt.db.elephantsql.com:5432/crxnqdqu"

# if __name__ == "__main__":
#     from sqlalchemy import create_engine

#     engine = create_engine(DB_URI)
#     Base.metadata.drop_all(engine)
#     Base.metadata.create_all(engine)

from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

engine = create_engine("postgres://crxnqdqu:kInJllQCS3PgB8ISVP8J13nfC9qNiB_E@salt.db.elephantsql.com:5432/crxnqdqu")

session_factory = sessionmaker(bind=engine)
Session = scoped_session(session_factory)

class Country(Base):
	__tablename__ = 'country'
	id = Column(Integer, primary_key=True)
	x = Column(Float)
	y = Column(Float)
	slope = Column(Float)
	dem = Column(Integer)
	land = Column(Integer)
	tmin_2100 = Column(Float)
	tmax_2100 = Column(Float)
	tmin_2050 = Column(Float)
	tmax_2050 = Column(Float)
	tmin_2020 = Column(Float)
	tmax_2020 = Column(Float)
	water_distance = Column(Float)
	urban_distance = Column(Float)
	arable_distance = Column(Float)

class SQLAlchemySessionManager:
	def __init__(self, Session):
		self.Session = Session

	def process_resource(self, req, resp, resource, params):
		resource.session = self.Session()

	def process_response(self, req, resp, resource, req_succeeded):
		if hasattr(resource, 'session'):
			if not req_succeeded:
				resource.session.rollback()
			Session.remove()