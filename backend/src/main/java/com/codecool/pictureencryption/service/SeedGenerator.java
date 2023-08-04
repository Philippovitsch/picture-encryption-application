package com.codecool.pictureencryption.service;

import org.springframework.stereotype.Service;

@Service
public class SeedGenerator {

    public long generateSeedFromString(String string) {
        long seed = 0;
        for (int character : string.toCharArray()) {
            seed += character;
        }
        return seed;
    }

}
