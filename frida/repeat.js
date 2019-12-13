Interceptor.replace( ptr(ilbase.add(0x018b0c18))
,new NativeCallback(
    function () {
        return 0;
    }
, 'void', [])
);

hook(
0x0165d6e8
,{
    onEnter: function(args){
    },
    onLeave: function(ret){
        console.log(ret)
        ret.replace(1);
    }
});
