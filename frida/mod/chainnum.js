var ctx = {};

hook(
offset.chainctrl.add;
,{ // chain add
    onEnter: function(args){
        //console.log(args[2]);
        var tis = ptr(args[0]);
        var cn = tis.add(0x10).readInt();
        console.log(cn);
    },
    onLeave: function(ret){
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
        onLeave: function(retval){
            if(this.ct == 0){
                if(this.ahet == 1){
                    retval.replace(1);
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
