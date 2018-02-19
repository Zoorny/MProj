package com.netcracker.Controller;

import com.netcracker.Model.Objects.*;
import com.netcracker.Service.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class RESTController {

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

    @GetMapping(value = "/album/{id}")
    public ResponseEntity<Album> getAlbumById(@PathVariable("id") int id){
        Album album = service.getAlbumById(id);

        if (album == null)
            return new ResponseEntity<Album>(HttpStatus.NOT_FOUND);

        return new ResponseEntity<Album>(album, HttpStatus.OK);

    }

    @PostMapping(value = "/register",consumes = "application/json")
    public ResponseEntity<String> createUser(@RequestBody User user){
        if(service.createUser(user)){
            return new ResponseEntity<String>("User created", HttpStatus.CREATED);
        }else{
            return new ResponseEntity<String>("User already exists", HttpStatus.OK);
        }

    }

    @GetMapping(value = "/recommendations/{username}",produces ="application/json" )
    public ResponseEntity<List<Album>> getRecommendations(@PathVariable("username") String username){

        List<Album> albums = service.getRecommendations(username);

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

    @GetMapping(value = "/rating/{albumId}/{username}")
    public ResponseEntity<String> getAlbumRating(@PathVariable("albumId")int albumId, @PathVariable("username") String username){
        String response = service.getAlbumRating(albumId, username);
        if (response != "empty") return new ResponseEntity<String>(response, HttpStatus.OK);
        else return new ResponseEntity<String>("empty", HttpStatus.OK);
    }

    @PostMapping(value = "/rating/",consumes = "application/json")
    public ResponseEntity<String> setAlbumRating(@RequestBody RatingRequest ratingRequest){
        if(ratingRequest.getRating() == 0){
            service.deleteAlbumRating(ratingRequest.getAlbumId(), ratingRequest.getUsername());
        }else{
            service.setAlbumRating(ratingRequest.getAlbumId(), ratingRequest.getUsername(), ratingRequest.getRating());
        }
        return new ResponseEntity<String>("Rating updated", HttpStatus.OK);
    }

    @GetMapping(value = "/rating/total/{albumId}")
    public ResponseEntity<Integer> getAlbumRating(@PathVariable("albumId")int albumId){
        int response = service.getTotalAlbumRating(albumId);
        return new ResponseEntity<Integer>(response, HttpStatus.OK);

    }

    @PostMapping(value = "/review/",consumes = "application/json")
    public ResponseEntity<String> createReview(@RequestBody Review review){
        service.createReview(review);
        return new ResponseEntity<String>("Review created", HttpStatus.CREATED);
    }

    @GetMapping(value = "/review/{albumId}/{username}")
    public ResponseEntity<Review> getAlbumReview(@PathVariable("albumId")int albumId, @PathVariable("username") String username) {
        Review response = service.getAlbumReview(albumId, username);
        if (response != null) return new ResponseEntity<Review>(response, HttpStatus.OK);
        else return new ResponseEntity<Review>(response, HttpStatus.NO_CONTENT);
    }

    @GetMapping(value = "/review/{albumId}",produces ="application/json" )
    public ResponseEntity<List<Review>> getReviews(@PathVariable("albumId")int albumId){

        List<Review> reviews = service.getReviews(albumId);

        if (reviews.isEmpty())
            return new ResponseEntity<List<Review>>(HttpStatus.NO_CONTENT);

        return new ResponseEntity<List<Review>>(reviews, HttpStatus.OK);
    }

    @PostMapping(value = "/album/search")
    public ResponseEntity<List<Album>> selectAlbums(@RequestBody AlbumRequest request){
        return new ResponseEntity<List<Album>>(service.selectAlbums(request), HttpStatus.OK);
    }












}
