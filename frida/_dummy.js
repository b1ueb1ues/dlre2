
var ctx = {};

var invincible = 1;
var attack = 0;
var attack = 2000;


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


hook(
offset.maingameleavealonechecker.setleavealonetime
,{
    onEnter: function(args){
        this.tis = args[0];
        console.log('setleavealone');
    },
    onLeave: function(retval){
        tis = this.tis;
        tis.add(offset.maingameleavealonechecker.warnningtime)
            .writeFloat(100000);
        tis.add(offset.maingameleavealonechecker.exittime)
            .writeFloat(100000);
    }
});

if(attack){ 
    // CharacterBase$$get_attack
    hook(offset.characterbase.get_attack, { 
        onEnter: function(args){
            cb = args[0];
            o_cb = offset.characterbase;
            ct =     cb.add(  o_cb.charactertype           ).readInt(); 
            this.ct = ct
        },
        onLeave: function(retval){
            if(this.ct == 0){
                retval.replace(attack);
            }
            else{
                retval.replace(1);
            }
        }
    });
}
if(invincible){
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
            var ahet = cha.add(o_cha.actionhitexectype).readInt();  // actionhitexectype
            this.ahet = ahet;
            //console.log('actionhitexectype: '+ahet);
        },
        onLeave: function(retval){
            if(this.ct == 0){
                if(this.ahet == 1){
                    retval.replace(1);
                }
                else if(this.ahet == 6){
                    retval.replace(1);
                }
            }
        }
    });
}

