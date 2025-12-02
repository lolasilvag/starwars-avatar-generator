const svgPaths=[
                '/assets/darkjedi.svg',
                '/assets/sith_red.svg',
                '/assets/droid_detailed.svg',
                '/assets/yoda.svg',
                '/assets/chewbacca.svg',
                '/assets/jedi.svg'
            ];

let currentSize = 200;

export function generateHash(str){let hash=0;
    for(let i=0;i<str.length;i++)
        {
            hash=str.charCodeAt(i)+((hash<<5)-hash);
        }
        return Math.abs(hash);
    }
    async function loadSVG(path)
    {
        const response=await fetch(path);
        return await response.text();
    }

function applySize(){const svg=document.querySelector('#avatarContainer svg');
    if(svg){svg.style.width=currentSize+'px';
        svg.style.height=currentSize+'px';
        document.getElementById('sizeValue').textContent=currentSize+'px';
    }}

window.generateAvatar=async function()
{
    const name=document.getElementById('nameInput').value||'Default';
    const hash=generateHash(name);
    const index=hash%svgPaths.length;
    const svgContent=await loadSVG(svgPaths[index]);
    document.getElementById('avatarContainer').innerHTML=svgContent;
    applySize();
};

window.generateRandomAvatar=async function()
{
    const index=Math.floor(Math.random()*svgPaths.length);
    const svgContent=await loadSVG(svgPaths[index]);
    document.getElementById('avatarContainer').innerHTML=svgContent;
    applySize();
};

window.downloadPNG=function(){const svgElement=document.querySelector('#avatarContainer svg');
    if(!svgElement)return alert('Gere um avatar primeiro!');
    const svgData=new XMLSerializer().serializeToString(svgElement);
    const canvas=document.createElement('canvas');
    canvas.width=currentSize;canvas.height=currentSize;
    const ctx=canvas.getContext('2d');
    const img=new Image();
    const svgBlob=new Blob([svgData],{type:'image/svg+xml;charset=utf-8'});
    const url=URL.createObjectURL(svgBlob);img.onload=function()
    {
        ctx.drawImage(img,0,0,currentSize,currentSize);
        URL.revokeObjectURL(url);
        const pngUrl=canvas.toDataURL('image/png');
        const link=document.createElement('a');
        link.href=pngUrl;link.download='avatar-starwars-'+currentSize+'px.png';
        link.click();
    };
    img.src=url;
};

const sizeSelect=document.getElementById('sizeSelect');
const sizeRange=document.getElementById('sizeRange');
sizeSelect.addEventListener('change',()=>{
    currentSize=parseInt(sizeSelect.value,10);
    sizeRange.value=currentSize;applySize();
});
sizeRange.addEventListener
('input',()=>{currentSize=parseInt(sizeRange.value,10);
    sizeSelect.value=currentSize;applySize();
});

generateRandomAvatar();