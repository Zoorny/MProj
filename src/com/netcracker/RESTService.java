package com.netcracker;

import com.netcracker.Objects.Artist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class RESTService {

    @Autowired
    Service service;

    @GetMapping(value = "/artist",produces ="application/json" )
    public ResponseEntity<List<Artist>> getAllArtists(){

        List<Artist> artists = service.getAllArtists();

        if (artists.isEmpty())
            return new ResponseEntity<List<Artist>>(HttpStatus.NO_CONTENT);

        return new ResponseEntity<List<Artist>>(artists, HttpStatus.OK);

    }

    @GetMapping(value = "/artist/{id}")
    public ResponseEntity<Artist> getArtistById(@PathVariable("id") int id){
        Artist artist = service.getArtistById(id);

        if (artist == null)
            return new ResponseEntity<Artist>(HttpStatus.NOT_FOUND);

        return new ResponseEntity<Artist>(artist, HttpStatus.OK);

    }


    @PostMapping(value = "/artist",consumes = "application/json")
    public ResponseEntity<Artist> addArtist(@RequestBody Artist artist){
        service.addArtist(artist);
        return new ResponseEntity<Artist>(artist, HttpStatus.CREATED);
    }

    @DeleteMapping(value="/artist/{id}")
    public ResponseEntity<Artist> deleteArtistById(@PathVariable("id") int id){

        service.deleteArtistById(id);
        return new ResponseEntity<Artist>(HttpStatus.NO_CONTENT);

    }

}
