package com.codecool.pictureencryption.service;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class PictureEncryptionEndpointService {

    private final PictureConverter pictureConverter;
    private final PixelSwapper pixelSwapper;
    private final ResourceLoader resourceLoader;

    @Value("${sample.pictures}")
    private Resource[] samplePictures;

    @Value("${sample.pictures.location}")
    private String samplePicturesLocation;

    public PictureEncryptionEndpointService(PictureConverter pictureConverter, PixelSwapper pixelSwapper, ResourceLoader resourceLoader) {
        this.pictureConverter = pictureConverter;
        this.pixelSwapper = pixelSwapper;
        this.resourceLoader = resourceLoader;
    }

    public List<String> getSamplePictures() {
        return Arrays.stream(samplePictures)
            .map(samplePicture -> samplePicture.getFilename())
            .toList();
    }

    public byte[] getSamplePictureByFilename(String filename) throws IOException {
        Resource resource = resourceLoader.getResource(samplePicturesLocation + filename);
        if (resource.exists()) {
            return resource.getContentAsByteArray();
        }
        return null;
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
