package com.codecool.pictureencryption.service;

import org.springframework.stereotype.Service;

@Service
public class PictureEncryptionEndpointService {

    public String encryptPicture() {
        return "Picture successfully encrypted...";
    }

    public String decryptPicture() {
        return "Picture successfully decrypted...";
    }

}
