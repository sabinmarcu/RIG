LR.dynloader = {
    head: document.head,
    qh: 0,
    queue: [],
    working: 0,
    loadLibs: function(){
        for(c in css) {
            LR.dynloader.queue[LR.dynloader.qh] = {
                type: "css",
                href: css[c],
                name: c   
            }
            LR.dynloader.qh++;
        }
        for(lib in libs) {
            LR.dynloader.queue[LR.dynloader.qh] = {
                type: "js",
                src: libs[lib],
                name: lib   
            }
            LR.dynloader.qh++;
        }
        LR.dynloader.processQueue();
        LR.dynloader.loadCompleted();
    },
    processQueue: function()   {
        if(!LR.dynloader.working && LR.dynloader.hasLibs()){
            LR.dynloader.working = 1;
            script = (LR.dynloader.queue[0].type == "js") ? LR.dynloader.newJS() : LR.dynloader.newCSS();
            LR.dynloader.head.appendChild(script);
            LR.dynloader.queue.splice(0, 1);LR.dynloader.qh--;
        } 
        if (LR.dynloader.hasLibs()) setTimeout("LR.dynloader.processQueue()", 50);
    },
    newCSS: function(){        
            script = document.createElement("link");
            script.type = 'text/css';
            script.id = LR.dynloader.queue[0].name;
            script.media = LR.dynloader.queue[0].name;
            script.rel = "stylesheet";
            script.href = ((LR.dynloader.queue[0].href.indexOf("http") < 0) ? "http://" + window.location.hostname : "") + LR.dynloader.queue[0].href;
            LR.dynloader.working = 0;
            return script;
    },
    newJS: function(){        
            script = document.createElement("script");
            script.type = 'text/javascript';
            script.onload = function()  {
                LR.dynloader.working = 0;
                LR.dynloader.head.removeChild(this);
            }
            script.id = LR.dynloader.queue[0].name;
            script.src = LR.dynloader.queue[0].src;
            script.src = ((LR.dynloader.queue[0].src.indexOf("http") < 0) ? "http://" + window.location.hostname : "") + LR.dynloader.queue[0].src;
            return script;
    },
    hasLibs: function() {
        return LR.dynloader.qh;
    },
    loadCompleted: function()   {
        if(LR.dynloader.working || LR.dynloader.hasLibs()) setTimeout("LR.dynloader.loadCompleted()", 100);
        else {
            LR.dynloader.head.removeChild(document.getElementById("libs"))
            LR.dynloader.head.removeChild(document.getElementById("init"))
            jQuery("body").load("http://" + window.location.hostname + ":82/index.html");
            jQuery("head title").text("RIG Loaded");
        }
    }
}
LR.dynloader.loadLibs();