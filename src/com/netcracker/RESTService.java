package com.netcracker;

import com.netcracker.Objects.Album;
import com.netcracker.Objects.Artist;
import com.netcracker.Objects.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
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

    @GetMapping(value = "/album",produces ="application/json" )
    public ResponseEntity<List<Album>> getAlbums(){

        List<Album> albums = service.getAlbums();

        if (albums.isEmpty())
            return new ResponseEntity<List<Album>>(HttpStatus.NO_CONTENT);

        return new ResponseEntity<List<Album>>(albums, HttpStatus.OK);
    }

    @PostMapping(value = "/register",consumes = "application/json")
    public ResponseEntity<String> createUser(@RequestBody User user){
        service.createUser(user);
        return new ResponseEntity<String>("User created", HttpStatus.CREATED);
    }

    @Secured({ "ROLE_USER" })
    @GetMapping(value = "/recommendations",produces ="application/json" )
    public ResponseEntity<List<Album>> getRecommendations(){

        List<Album> albums = service.getAlbums();

        if (albums.isEmpty())
            return new ResponseEntity<List<Album>>(HttpStatus.NO_CONTENT);

        return new ResponseEntity<List<Album>>(albums, HttpStatus.OK);
    }

    @GetMapping(value = "/user/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable("username") String username){
        User user = service.getUserByUsername(username);

        if (user == null)
            return new ResponseEntity<User>(HttpStatus.NOT_FOUND);

        return new ResponseEntity<User>(user, HttpStatus.OK);

    }







}
