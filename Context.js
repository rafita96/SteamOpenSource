var Context = {
    context: null,
    canvas: null,
    create: function(){
        this.canvas = document.getElementById("canvas");
        this.context = canvas.getContext('2d');

        return this.context;
    },
};