var ctx = {};


//hook(
//0x1620ACC //showdamageui
//,{
//    onEnter: function (args) {
//        var pos = this.context.x2;
//        console.log(pos);
//    }
//});

hook(
//0x17E39CC //setup
//0x1620ACC //showdamageui
0x017e5314 //setupalpha
,{
    onEnter: function (args) {
        for (var i in this.context) {
            console.log(i, ':', this.context[i])
        }
    }
});


if(1){
    // CharacterBase$$IsInvincibleOnHitCheck
    hook(offset.characterbase.isinvincibleonhitcheck, { 
        onEnter: function(args){
            var o_cb = offset.characterbase;
            var o_cha = offset.collisionhitattribute;

            var cb = args[0];          //characterbase owner
            var p_ct = cb.add(o_cb.charactertype); 
            var ct = p_ct.readInt();   //charactertype
            this.ct = ct;

            var cha = args[1];
            var ahet = cha.add(o_cha.actionhitexectype).readInt();
            this.ahet = ahet;
            //console.log('actionhitexectype: '+ahet);
        },
        onLeave: function(ret){
            if(this.ct == 0){
                if(this.ahet == 1){
                    ret.replace(1);
                }
            }
        }
    });
}


if(1){
    hook(
    offset.enemyctrl.setaiaction
    ,{
        onEnter: function(args){
            //console.log('onEnter:'+args[0]); //+args[0]);
            this.context.x1 = 0;
        },
        onLeave: function(ret){
        }
    });
}
