package com.codecool.pictureencryption.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Random;
import java.util.stream.IntStream;

import org.springframework.stereotype.Service;

@Service
public class PixelSwapper {

    private final ArrayConverter arrayConverter;
    private final SeedGenerator seedGenerator;

    public PixelSwapper(ArrayConverter arrayConverter, SeedGenerator seedGenerator) {
        this.arrayConverter = arrayConverter;
        this.seedGenerator = seedGenerator;
    }

    public int[][] encryptPixels(int[][] pixels, String password) {
        long seed = seedGenerator.generateSeedFromString(password);
        int[][] encryptedPixels1 = swapRandom(pixels, seed);
        int[][] encryptedPixels2 = swapMathSin(encryptedPixels1, true);
        return encryptedPixels2;
    }

    public int[][] decryptPixels(int[][] pixels, String password) {
        long seed = seedGenerator.generateSeedFromString(password);
        int[][] decryptedPixels1 = swapMathSin(pixels, false);
        int[][] decryptedPixels2 = swapRandom(decryptedPixels1, seed);
        return decryptedPixels2;
    }

    private int[][] swapRandom(int[][] pixels, long seed) {
        int width = pixels.length;
        int height = pixels[0].length;
        int[] flattenedPixels = arrayConverter.convert2dTo1dArray(pixels);

        final ArrayList<Integer> indexes = IntStream
                .iterate(0, i -> i + 1)
                .limit(flattenedPixels.length)
                .collect(ArrayList::new, ArrayList::add, ArrayList::addAll);

        Collections.shuffle(indexes, new Random(seed));

        for (int i = 0; i < indexes.size(); i += 2) {
            int tmp = flattenedPixels[indexes.get(i)];
            flattenedPixels[indexes.get(i)] = flattenedPixels[indexes.get(i + 1)];
            flattenedPixels[indexes.get(i + 1)] = tmp;
        }

        return arrayConverter.convert1dTo2dArray(flattenedPixels, width, height);
    }

    private int[][] swapMathSin(int[][] pixels, boolean encrypt) {
        int width = pixels.length;
        int height = pixels[0].length;
        int amount = width * height;
        int[] list = new int[amount];
        int[] mapping = new int[amount];
        int[][] newPixels = new int[width][height];

        for (int i = 0; i < amount; i++) {
            list[i] = i;
        }

        for (int i = amount - 1; i >= 0 ; i--) {
            int num = (Math.abs((int) (Math.sin(i) * amount))) % (i + 1);
            mapping[i] = list[num];
            list[num] = list[i];
        }

        for (int xy = 0; xy < amount; xy++) {
            int x = xy % width;
            int y = xy / width;
            int xyMap = mapping[xy];
            int newX = xyMap % width;
            int newZ = xyMap / width;

            if (encrypt) {
                newPixels[x][y] = pixels[newX][newZ];
            } else {
                newPixels[newX][newZ] = pixels[x][y];
            }
        }

        return newPixels;
    }

}
