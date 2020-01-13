
hook(
0x01f11974
,{
    onEnter: function(args) {
        console.log('test');
        var p_br = args[1];
        var damage = p_br.add(0x48).readS32();
        console.log(damage);
    }
});

if(1){
hook(
offset.characterbase.recoverysp
,{
    onEnter: function(args){
        console.log('** sp: '+args[1].toInt32());
        this.context.x1 = 20000;
    },
    onLeave: function(retval){
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

