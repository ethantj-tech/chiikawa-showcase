#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// 基础配置
const BASE_DIR = path.join(__dirname, 'public', 'images', 'chiikawa');
const CONCURRENT_DOWNLOADS = 5; // 并发下载数量

// 创建目录
const dirs = {
    chiikawa: path.join(BASE_DIR, 'chiikawa'),
    hachiware: path.join(BASE_DIR, 'hachiware'),
    usagi: path.join(BASE_DIR, 'usagi'),
    kurimanju: path.join(BASE_DIR, 'kurimanju')
};

Object.values(dirs).forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// 示例图片URL列表（这些是从堆糖网获取的实际图片）
const imageUrls = [
    // 乌萨奇
    { url: 'https://c-ssl.duitang.com/uploads/blog/202312/23/eASqY04YFMlpe14.gif', character: 'usagi' },
    { url: 'https://c-ssl.duitang.com/uploads/blog/202312/23/xxx.gif', character: 'usagi' }, // 需要补充实际URL
    { url: 'https://c-ssl.duitang.com/uploads/blog/202312/23/xxx.gif', character: 'usagi' },
    // 需要继续添加更多图片URL...
];

// 下载图片函数
function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        const protocol = url.startsWith('https') ? https : http;
        
        const file = fs.createWriteStream(filepath);
        
        protocol.get(url, (response) => {
            if (response.statusCode === 200) {
                response.pipe(file);
                
                file.on('finish', () => {
                    file.close();
                    resolve(filepath);
                });
            } else {
                file.close();
                fs.unlinkSync(filepath);
                reject(new Error(`Failed to download: ${response.statusCode}`));
            }
        }).on('error', (err) => {
            file.close();
            fs.unlinkSync(filepath);
            reject(err);
        });
    });
}

// 并发下载
async function downloadAllImages() {
    let index = 0;
    
    for (const { url, character } of imageUrls) {
        try {
            const ext = url.split('.').pop();
            const filename = `${character}_${index + 1}.${ext}`;
            const filepath = path.join(dirs[character], filename);
            
            console.log(`Downloading: ${filename} (${index + 1}/${imageUrls.length})`);
            await downloadImage(url, filepath);
            console.log(`✓ Downloaded: ${filename}`);
            
            index++;
        } catch (error) {
            console.error(`✗ Failed to download ${url}:`, error.message);
        }
    }
    
    console.log('\n✅ All downloads completed!');
}

// 运行下载
downloadAllImages().catch(console.error);
