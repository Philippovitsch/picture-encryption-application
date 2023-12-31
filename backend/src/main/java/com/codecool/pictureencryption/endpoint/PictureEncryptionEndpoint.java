package com.codecool.pictureencryption.endpoint;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    @GetMapping("/sample-pictures")
    public List<String> getSamplePictures() {
        return pictureEncryptionEndpointService.getSamplePictures();
    }

    @GetMapping(path = "/sample-pictures/{filename}", produces = MediaType.IMAGE_JPEG_VALUE)
    public byte[] getSamplePictureByFilename(@PathVariable("filename") String filename) throws IOException {
        return pictureEncryptionEndpointService.getSamplePictureByFilename(filename);
    }

    @PostMapping(path = "/encrypt", produces = MediaType.IMAGE_PNG_VALUE)
    public BufferedImage encryptPicture(
        @RequestParam("file") MultipartFile file,
        @RequestParam("password") String password
    ) throws IOException {
        return pictureEncryptionEndpointService.encryptPicture(file, password);
    }

    @PostMapping(path = "/decrypt", produces = MediaType.IMAGE_PNG_VALUE)
    public BufferedImage decryptPicture(
        @RequestParam("file") MultipartFile file,
        @RequestParam("password") String password
    ) throws IOException {
        return pictureEncryptionEndpointService.decryptPicture(file, password);
    }

}
