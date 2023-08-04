package com.codecool.pictureencryption.endpoint;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.codecool.pictureencryption.service.PictureEncryptionEndpointService;

@RestController
@RequestMapping("/api/picture")
@CrossOrigin
public class PictureEncryptionEndpoint {

    private final PictureEncryptionEndpointService pictureEncryptionEndpointService;

    public PictureEncryptionEndpoint(PictureEncryptionEndpointService pictureEncryptionEndpointService) {
        this.pictureEncryptionEndpointService = pictureEncryptionEndpointService;
    }

    @GetMapping("/encrypt")
    public String encryptPicture() {
        return pictureEncryptionEndpointService.encryptPicture();
    }

        @GetMapping("/decrypt")
    public String decryptPicture() {
        return pictureEncryptionEndpointService.decryptPicture();
    }

}
