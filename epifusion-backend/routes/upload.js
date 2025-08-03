import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import { encryptBuffer } from '../utils/crypto.js';
import { chunkAndEmbed } from '../services/embedService.js';

const router = Router();
const upload = multer({ dest: 'tmp/' });

router.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file provided' });
  }

  const { region = 'unknown' } = req.body;

  

  try {
    const buffer = await fs.readFile(req.file.path);
    const encrypted = await encryptBuffer(buffer);

    const fileId = Date.now();                       // simple unique id
    const regionDir = `data/regions/${region}`;
    await fs.mkdir(regionDir, { recursive: true });

    const savePath = path.join(
      regionDir,
      `${fileId}_${req.file.originalname}.enc`
    );
    router.post('/upload', upload.single('file'), async (req, res) => {
  console.log('[UPLOAD]', req.file?.originalname, 'region=', req.body.region);
});

    await fs.writeFile(savePath, encrypted);

    await chunkAndEmbed(buffer.toString('utf8'), region, fileId, req.file.originalname);

    res.json({ success: true, fileId });
  } catch (err) {
    console.error('UPLOAD ERROR:', err);
    res.status(500).json({ success: false, message: 'Upload failed' });
  } finally {
    fs.rm(req.file.path, { force: true }).catch(() => {});
  }
});

export default router;