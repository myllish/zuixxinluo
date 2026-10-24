function copyText(text){
    navigator.clipboard.writeText(text).then(()=>{
        const t = document.getElementById("toast");
        t.classList.add("show");
        setTimeout(()=>t.classList.remove("show"),1600);
    })
}
function cleanMotd(raw){
    if(!raw) return "暂无信息";
    return raw.replace(/§[0-9a-fklmnor]/gi,"");
}
async function queryServerStatus(){
    try{
        const resJ = await fetch("https://api.mcsrvstat.us/2/xinluo.vemc.cc");
        const dataJ = await resJ.json();
        const dotJ = document.getElementById("java-dot");
        const stJ = document.getElementById("java-status-text");
        const pJ = document.getElementById("java-players");
        const motdJ = document.getElementById("java-motd");
        if(dataJ.online){
            dotJ.className = "status-dot online";
            stJ.innerText = "服务器在线";
            pJ.innerText = `${dataJ.players.online} / ${dataJ.players.max}`;
            let motdStr = Array.isArray(dataJ.motd?.raw) ? dataJ.motd.raw.join(" ") : dataJ.motd?.raw || dataJ.motd?.clean;
            motdJ.innerText = cleanMotd(motdStr);
        }else{
            dotJ.className = "status-dot offline";
            stJ.innerText = "服务器离线";
            pJ.innerText = "0";
            motdJ.innerText = "服务器离线，无MOTD";
        }
    }catch(e){
        document.getElementById("java-dot").className = "status-dot offline";
        document.getElementById("java-status-text").innerText = "查询失败";
        document.getElementById("java-motd").innerText = "接口请求失败";
    }
    try{
        const resB = await fetch("https://api.mcsrvstat.us/bedrock/2/xtdmc.top:29201");
        const dataB = await resB.json();
        const dotB = document.getElementById("be-dot");
        const stB = document.getElementById("be-status-text");
        const pB = document.getElementById("be-players");
        const motdB = document.getElementById("be-motd");
        if(dataB.online){
            dotB.className = "status-dot online";
            stB.innerText = "服务器在线";
            pB.innerText = `${dataB.players.online} / ${dataB.players.max}`;
            let motdStr = Array.isArray(dataB.motd?.raw) ? dataB.motd.raw.join(" ") : dataB.motd?.raw || dataB.motd?.clean;
            motdB.innerText = cleanMotd(motdStr);
        }else{
            dotB.className = "status-dot offline";
            stB.innerText = "服务器离线";
            pB.innerText = "0";
            motdB.innerText = "服务器离线，无MOTD";
        }
    }catch(e){
        document.getElementById("be-dot").className = "status-dot offline";
        document.getElementById("be-status-text").innerText = "查询失败";
        document.getElementById("be-motd").innerText = "接口请求失败";
    }
}
queryServerStatus();
setInterval(queryServerStatus,60000);
