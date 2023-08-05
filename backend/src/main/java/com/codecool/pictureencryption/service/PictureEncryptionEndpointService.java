package com.codecool.pictureencryption.service;

import java.awt.image.BufferedImage;
import java.io.IOException;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class PictureEncryptionEndpointService {

    private final PictureConverter pictureConverter;
    private final PixelSwapper pixelSwapper;

    public PictureEncryptionEndpointService(PictureConverter pictureConverter, PixelSwapper pixelSwapper) {
        this.pictureConverter = pictureConverter;
        this.pixelSwapper = pixelSwapper;
    }

    public BufferedImage encryptPicture(MultipartFile picture, String password) throws IOException {
        int[][] pixels = pictureConverter.readPixels(picture);
        int[][] encryptedPixels = pixelSwapper.encryptPixels(pixels, password);
        return pictureConverter.writePixels(encryptedPixels);
    }

    public BufferedImage decryptPicture(MultipartFile picture, String password) throws IOException {
        int[][] pixels = pictureConverter.readPixels(picture);
        int[][] decryptedPixels = pixelSwapper.decryptPixels(pixels, password);
        return pictureConverter.writePixels(decryptedPixels);
    }

}
