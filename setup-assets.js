
const fs = require('fs');
const https = require('https');
const path = require('path');

// 1. Define folder path: ./public/images
const dir = path.join(__dirname, 'public', 'images');

// 2. Create directory if it doesn't exist
if (!fs.existsSync(dir)){
    console.log(`Creating directory: ${dir}`);
    fs.mkdirSync(dir, { recursive: true });
} else {
    console.log(`Directory already exists: ${dir}`);
}

// 3. List of placeholder images to download
// We use Unsplash for high-quality wedding placeholders and a QR generator for QRIS
const images = [
    { 
        filename: 'hero.jpg', 
        url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1000&auto=format&fit=crop' 
    },
    { 
        filename: '1.jpg', 
        url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop' 
    },
    { 
        filename: '2.jpg', 
        url: 'https://images.unsplash.com/photo-1511285560982-1351cdeb9821?q=80&w=800&auto=format&fit=crop' 
    },
    { 
        filename: '3.jpg', 
        url: 'https://images.unsplash.com/photo-1522673607200-1645062cd2d1?q=80&w=800&auto=format&fit=crop' 
    },
    { 
        filename: '4.jpg', 
        url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop' 
    },
    { 
        filename: '5.jpg', 
        url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=800&auto=format&fit=crop' 
    },
    { 
        filename: 'qris.jpg', 
        url: 'https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=MpeyAndAdelliarnWeddingGift&bgcolor=ffffff&color=121212&margin=10' 
    }
];

// 4. Download function
const downloadImage = (url, filepath) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filepath);
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(filepath, () => {}); // Delete the file async. (But we don't check the result)
            reject(err);
        });
    });
};

// 5. Execute
(async () => {
    console.log('Starting asset download...');
    
    for (const img of images) {
        const filepath = path.join(dir, img.filename);
        try {
            console.log(`Downloading ${img.filename}...`);
            await downloadImage(img.url, filepath);
            console.log(`✅ Saved ${filepath}`);
        } catch (error) {
            console.error(`❌ Error downloading ${img.filename}:`, error.message);
        }
    }
    
    console.log('\n--- SETUP COMPLETE ---');
    console.log('Folder "public/images" has been created.');
    console.log('You can now replace these files with your own photos!');
})();
