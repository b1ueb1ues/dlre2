var ctx = {};


hook(
0x1DB5630
,{ 
    onEnter: function(args){
        console.log(args[1]);
        console.log(hexdump(args[1]));
        var name = args[1].add(0x10);
        var name1 = name;
        name.writeUtf8String('test');
        //name.writeS8(0xa);
        //name1 = name1.add(0x4);
        //name1.writeU32(0x00e2808e); // uu
        //name1 = name1.add(0x4);
        //name1.writeU32(0x00750075); // uu
        //name1 = name1.add(0x4);
        //name1.writeU32(0x00750075); // uu
        //name1 = name1.add(0x4);
        //name1.writeU32(0x00750075); // uu
        //name1 = name1.add(0x4);
        //name1.writeU32(0x00750075); // uu
        //name1 = name1.add(0x4);
        //name1.writeS32(0x00750075); // uu
        //name1 = name1.add(0x4);
        //name1.writeS32(0x00750075); // uu
        //name1 = name1.add(0x4);
        //name1.writeS32(0x00750075); // uu
        //name1 = name1.add(0x4);
        //name1.writeS8(0x00); // \0
        console.log(hexdump(args[1]));
    },
    onLeave: function(ret){
    }
});

