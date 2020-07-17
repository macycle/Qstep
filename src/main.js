const $siteList=$('.siteList');     //找到sitelist的元素
const $lastLi=$siteList.find('.lastLi');  

const info =localStorage.getItem('info');
const infoObject=JSON.parse(info);
let hashMap=infoObject || [
]    //创建一个储存结构

const simplify=(url)=>{
    return url.replace('https://','').replace('http://','').replace('www.','').replace(/\/.*/,'')   //es6也支持链式写法了
}

const render=()=>{

    $siteList.find('li:not(.lastLi)').remove();  //先清空

    hashMap.forEach((node,index)=>{        
        const $li=$(`<li>       
            <div class="site">
                <div class="logo">${node.logo}</div>
                <div class="link">${simplify(node.url)}</div>
                <div class="close">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-guanbi"></use>
                    </svg>
                </div>
            </div> 
        </li>`).insertBefore($lastLi)  //insertBefore（）他会渲染到页面上

        $li.on('click',()=>{    //使用新窗口打开
            window.open(node.url)
        });
        $li.on('click','.close',(e)=>{   //阻止的是.close的那个元素冒泡
            e.stopPropagation();
            hashMap.splice(index,1);
            render();
        });
        console.log($li)
    })
}

render();

$('.addButton')
    .on('click',()=>{
    let url=window.prompt('请添加网址');
    if(url.indexOf('http')===-1){
        url='https://'+url;
    }
    hashMap.push({logo:simplify(url)[0].toUpperCase(),
        url:url}
        );
    render();
    
})

window.onbeforeunload=()=>{    //当页面离开时存到localstroage
    const string=JSON.stringify(hashMap)
    localStorage.setItem('info',string);
}

$(document).on('keypress',(e)=>{
    const {key}=e
    for(let i=0;i<hashMap.length;i++){
        if(hashMap[i].logo.toLowerCase()===key){
            window.open(hashMap[i].url)
        }
    }
})


