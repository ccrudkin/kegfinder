# kegfinder
A brewery-focused web app to track beer kegs and provide inventory information and production analytics.

Features include keg inventory building, tracking, and modification. Keg information data fields include:
- Keg ID
- initialized date
- keg condition
- keg type
- batch ID
- contents/style
- notes
- last change date

User login/registration system provides access to view and modify a specific user's inventory of kegs.

Before launching, create a SQLite database called <data.db> in the app's root directory, with table <users>.
