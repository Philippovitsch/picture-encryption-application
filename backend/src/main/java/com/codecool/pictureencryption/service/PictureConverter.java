package com.codecool.pictureencryption.service;

import java.awt.image.BufferedImage;
import java.io.IOException;

import javax.imageio.ImageIO;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class PictureConverter {

    public int[][] readPixels(MultipartFile file) throws IOException {
        BufferedImage image = ImageIO.read(file.getInputStream());
        int[][] pixels = new int[image.getWidth()][image.getHeight()];
        for (int x = 0; x < pixels.length; x++) {
            for (int y = 0; y < pixels[x].length; y++) {
                pixels[x][y] = image.getRGB(x, y);
            }
        }
        return pixels;
    }

    public BufferedImage writePixels(int[][] pixels) throws IOException {
        int width = pixels.length;
        int height = pixels[0].length;
        BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
        for (int x = 0; x < pixels.length; x++) {
            for (int y = 0; y < pixels[x].length; y++) {
                image.setRGB(x, y, pixels[x][y]);
            }
        }
        return image;
    }

}
