package com.codecool.pictureencryption.endpoint;

import java.awt.image.BufferedImage;
import java.io.IOException;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.codecool.pictureencryption.service.PictureEncryptionEndpointService;

@RestController
@RequestMapping("/api/picture")
@CrossOrigin
public class PictureEncryptionEndpoint {

    private final PictureEncryptionEndpointService pictureEncryptionEndpointService;

    public PictureEncryptionEndpoint(PictureEncryptionEndpointService pictureEncryptionEndpointService) {
        this.pictureEncryptionEndpointService = pictureEncryptionEndpointService;
    }

    @PostMapping(path = "/encrypt", produces = "image/png")
    public BufferedImage encryptPicture(@RequestParam("file") MultipartFile file) throws IOException {
        return pictureEncryptionEndpointService.encryptPicture(file);
    }

    @PostMapping(path = "/decrypt", produces = "image/png")
    public BufferedImage decryptPicture(@RequestParam("file") MultipartFile file) throws IOException {
        return pictureEncryptionEndpointService.decryptPicture(file);
    }

}
