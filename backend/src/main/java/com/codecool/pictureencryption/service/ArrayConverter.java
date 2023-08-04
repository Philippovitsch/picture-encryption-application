package com.codecool.pictureencryption.service;

import java.util.Arrays;
import java.util.stream.Stream;

import org.springframework.stereotype.Service;

@Service
public class ArrayConverter {

    public int[] convert2dTo1dArray(int[][] pixels) {
        return Stream.of(pixels).flatMapToInt(Arrays::stream).toArray();
    }

    public int[][] convert1dTo2dArray(int[] flattenedPixels, int width, int height) {
        int[][] newPixels = new int[width][height];
        int i = 0;
        for (int x = 0; x < width; x++) {
            for (int y = 0; y < height; y++) {
                newPixels[x][y] = flattenedPixels[i++];
            }
        }
        return newPixels;
    }

}
