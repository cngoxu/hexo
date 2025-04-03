// addEventListener("DOMContentLoaded", () => {
function getSummary(){
    var apiUrl = "https://summary.cngo.us.kg" // 这里填写你获得的 API 地址
    var outputContainer = document.getElementById("ai-output");

    //通过这个判断是否文章页面
    if(outputContainer == null) return;

    // 测试数据
    var title = document.getElementById("subtitle");
    var postTitle = title.getAttribute("data-typed-text");
    var container = document.getElementsByClassName("markdown-body")[0];
    var posts = container.querySelectorAll("p, h2, h3, h4, li");

    var postOriginContent = "";
    posts.forEach(function (node) {
        postOriginContent += node.innerText;
    });

    var postBeforeContent = postOriginContent.replace(/<[^<>]+>/g, "");
    var postContent = postBeforeContent.replace(/\n/g, '').replace(/[ ]+/g, ' ').replace(/<pre>[\s\S]*?<\/pre>/g, '').substring(0, 5000);

    //移除%，会导致url无法解析 decodeURIComponent(url)
    var url = apiUrl + `/?q=${postTitle.replaceAll("\%", '')}，文章内容：${postContent.replaceAll("\%", '')}`;
    var evSource = new EventSource(url);
    
    evSource.onmessage = (event) => {
        if (event.data == "[DONE]") {
            evSource.close();
            return;
        } else {
            var data = JSON.parse(event.data);
            if(outputContainer.innerHTML === ""){
                outputContainer.innerHTML += "<strong>分类: </strong>";
            }
            if(data.response === "\n" || data.response === "\n\n"){
                if(outputContainer.innerHTML.indexOf("\n") == -1 ){
                    outputContainer.innerHTML += "\n";
                    outputContainer.innerHTML += "<strong>标签: </strong>";
                }else{
                    outputContainer.innerHTML += "\n";
                }
            }else{
                outputContainer.innerHTML += data.response; 
            }
                
        }
    }
}
getSummary();
// });