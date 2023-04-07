import modulefinder
modfind=modulefinder.ModuleFinder()
modfind.run_script('./main.py')
print ('Modules loaded:')
for k,v in modfind.modules.items():
   print (k,v)
print ('not found:')
for i in modfind.badmodules.keys():
   print (i)