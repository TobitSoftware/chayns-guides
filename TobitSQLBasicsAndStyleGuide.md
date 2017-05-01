# SQL Basics
This article addresses the basics of SQL with regard to table design and data access via C #.

## Conventions
At first here are some conventions in naming functions, parameters and endpoints in order to achieve an uniform design.

| Description | Convention |
|---|---|
| Primary Key | Id | 
| Table Name | PascalCase and Singular |
| Assignment-TableName | Table1Table2.. |
| Row name | PascalCase |
| StoredProcedures | sp + PascalCase |
| Functions | fn + PascalCase |
| Views | vi + PascalCase |
| Trigger names | tr_TableName + F/A/IO/ + _U/D/I  (FOR/AFTER/INSTEAD OF ; UPDATE/DELETE/INSERT) |
| Special cases | Uuid |


## Tables
This section deals with the layout and creation of tables, and important aspects to consider.
# Layout
Tables consist essentially of four components:
1. Primary key
2. Attributes (columns)
3. Records (rows)
4. Foreign key relationships

To create a meaningful relational database using these components, all tables must be normalized.

# Normalization
The term "normalization" is understood to mean the division of attributes, so that redundancies within the database are avoided. This leads to a consistent data base. There are basically five normal forms as well as other special ones. Usually, however, the application of the first three standard forms is sufficient.

**1. Normal Form (1NF)** 
In order to reach the first normal form, a table may contain only atomic attributes. That is, each attribute can store only a single value. For example, an "Album" attribute where album name and artist name are stored in one attribute is not allowed.

The solution is to divide the attribute into artist and title.

**2. Normal Form (2NF)**
For the second normal form, the first must be reached first. In addition, no attribute may be dependent on only a part of the primary key, but must always depend on the entire primary key. In example, the title of an album may not only depend on the albumID, but additionally on the track number.

**3. Normal Form (3NF)**
In order to achieve the third normal form, there must be no transitive dependencies on parts of the primary key in addition to the dependencies of parts of the primary key. In example, this appears in the relationship between artist, title and albumID, since the album name is only unique with the artist. To solve this problem, another table could be created that assigns an artistID to an artist.

**Creation**
For the creation of a table, the manual creation by using the "CREATE TABLE" command has proven itself against the modeling, since this is the direct control over the relations to be created.

## Data Access
This section discusses access to the created tabels using C #. This requires a WebAPI as well as a data project.

### Basics
Generally, when querying a database, it is important that it is ACID-compliant. ACID stands for atomarity, consistency, isolation and durability.

Atomarity means that database operations are performed atomically - that is, "completely or not at all". It is therefore not possible that a query is executed only half and thus runs the risk of leaving an inconsistent data stock.

Consistency means that the database remains in a consistent state after the query. If, for example, a field for postal code and city exists in a table, the postal code must also be changed when the location changes so that the data record remains consistent.

Insulation says that transactions that are parallel are not allowed to interfere with one another. If, for example, two persons are withdrawing money from a banking machine at the same time, it must be ensured that each of them receives the amount requested by him and that the account is correctly debited.

Durability means that data in the database must be permanently persistent. For example, in the event of a crash of the database server, it must be ensured that lost data can be recovered.

### Alternatives
To access a database using C #, there are several possibilities, such as the use of native SQL. The developer must first establish a connection to the database, then carry out the desired queries and finally put the data into a form with which it can continue. The following code section shows an example query.

```C#
using (var connection = new SqlConnection(CONNECTION_STRING)) {
  connection.open();
  using (var command  = new SqlCommand(“SELECT * FROM albums“)) {
    SqlDataReader reader = command.ExecuteReader();
    while (reader.Read()) { ... }
  }
} 
```
This method is generally not advisable as it can easily lead to security risks and the programming effort is relatively high. The advantage, however, is that the developer has full control over the queries performed.

Another possibility is the Entity Framework. The following code section shows an example query.
``` C#
using (var db = new AlbumEntities()) {
  var album = db.Albums.Select(m => m).FirstOrDefault();
} 
```
