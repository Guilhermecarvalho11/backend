const fs = require("fs"); //biblioteca para lidar com manipulação de arquivo
const path = require("path");
const uploadsConfig = require("../config/upload");

class DiskStorage {
  async saveFile(file) {
    await fs.promises.rename(
      path.resolve(uploadsConfig.TMP_FOLDER, file),
      path.resolve(uploadsConfig.UPLOADS_FOLDER, file)
    );
    return file; // aqui mudou o arquivo da pastar TMP para a UPLOADS
  }

  async deleteFile(file) {
    const filePath = path.resolve(uploadsConfig.UPLOADS_FOLDER, file); // Buscou o arqvo na pasta UPLOADS

    try {
      await fs.promises.stat(filePath); // verifica o estado do arquivo
    } catch {
      return;
    }

    await fs.promises.unlink(filePath); //para deletar o arquivo
  }
}

module.exports = DiskStorage;
