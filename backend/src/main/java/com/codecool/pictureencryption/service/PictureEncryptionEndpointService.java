package com.codecool.pictureencryption.service;

import java.awt.image.BufferedImage;
import java.io.IOException;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class PictureEncryptionEndpointService {

    private final PictureConverter pictureConverter;

    public PictureEncryptionEndpointService(PictureConverter pictureConverter) {
        this.pictureConverter = pictureConverter;
    }

    public BufferedImage encryptPicture(MultipartFile file) throws IOException {
        int[][] pixels = pictureConverter.readPixels(file);
        int[][] encryptedPixels = pixels;
        return pictureConverter.writePixels(encryptedPixels);
    }

    public BufferedImage decryptPicture(MultipartFile file) throws IOException {
        int[][] pixels = pictureConverter.readPixels(file);
        int[][] decryptedPixels = pixels;
        return pictureConverter.writePixels(decryptedPixels);
    }

}
