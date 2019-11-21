
var ctx = {};

var printstat = 1;
var stockatt = 0;

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


if(printstat){ // print stat

hook(
offset.characterbase.get_attack
,{
    onEnter: function(args){
    },
    onLeave: function(retval){
        console.log('** att: '+retval.toInt32());
    }
});

hook(
offset.characterbase.get_defence
,{
    onEnter: function(args){
    },
    onLeave: function(retval){
        console.log('** def:'+i2f(retval) );
    }
}); 

hook(
offset.characterbase.get_defcoef
,{
    onEnter: function(args){
    },
    onLeave: function(retval){
        console.log('** defcoef:'+i2f(retval) );
    }
}); 

hook(
offset.characterbase.recoverysp
,{
    onEnter: function(args){
        console.log('** sp: '+args[1].toInt32());
    },
    onLeave: function(retval){
    }
});

}

if(stockatt){ // normalize damage 
hook(
offset.damagecalculation.calculationbasedamage
,{
    onEnter: function(args){
        ctx.dc_cbd = 1
    },
    onLeave: function(retval){
        ctx.dc_cbd = 0
        console.log('basedmg: '+i2f(retval));
    }
});

hook(
offset.characterbase.get_attack
,{
    onEnter: function(args){
    },
    onLeave: function(retval){
        console.log('repaceatt: '+retval.toInt32()+' -> 600');
        retval.replace(600);
    }
});
}


var invincible = 1;
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

var attack = 5000;
if(attack){ 
    // CharacterBase$$get_attack
    hook(offset.characterbase.get_attack, { 
        onEnter: function(args){
            var cb = args[0];
            var o_cb = offset.characterbase;
            var ct =     cb.add(  o_cb.charactertype           ).readInt(); 
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



