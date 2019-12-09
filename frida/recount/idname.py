import re
import os
f = open('textlabel.asset')
data = f.read()
charaname = re.findall(r'CHARA_NAME_(\d+)"\n.*_Text = "(.*)"', data)
skillname = re.findall(r'SKILL_NAME_(\d+)"\n.*_Text = "(.*)"', data)
enemyskill = re.findall(r'ENEMY_SKILL.*_(\d+)"\n.*_Text = "(.*)"', data)

print(skillname)

#def replace(f):
#    for i in open(f):
#
#
#for root, dirs, files in os.walk('.'):
#    for i in files:
#        if i[-4:] == '.csv':
#            replace(i)
#
#
