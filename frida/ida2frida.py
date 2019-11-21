path_in = '../script.py'
path_out = '0_symbol.js'
path_template = 'template.js'

functions = []
for i in open(path_in):
    if i[:10] != 'SetMethod(':
        continue
    end = i.find("')")
    i = i[10:end]
    an = i.strip().split(', \'')
    addr = int(an[0],16)
    name = an[1].strip()
    functions.append((name, addr))

fout = open(path_out)
for i in open(path_template):
    if '#' in i:
        part = i.split('//')
        part = part[0].split('=')
        symbol = part[1].replace(';','').split(',')
        if len(symbol) == 1:
            name = symbol[0].replace('#','')
            name = name.strip()
            idx = 1
        elif len(symbol) == 2:
            name = symbol[0].replace('#','')
            name = name.strip()
            idx = int(symbol[1])
        else:
            raise

        print(name, idx)
        for i in functions:
            if functions[0] == name:
                print(functions, name, idx)
    else:
        fout.write(i)


