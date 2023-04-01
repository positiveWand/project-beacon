import dbconnection

dao = dbconnection.DBConnection("azure-testdb")

print(str(dao.efp("SELECT * FROM user")))