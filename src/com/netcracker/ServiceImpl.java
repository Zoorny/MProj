package com.netcracker;

import com.netcracker.Objects.Album;
import com.netcracker.Objects.Artist;
import com.netcracker.Objects.Review;
import com.netcracker.Objects.User;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

@org.springframework.stereotype.Service
public class ServiceImpl implements Service {

    @Autowired
    private OracleDAO oracleDAO;

    public void addArtist(Artist artist) {
        oracleDAO.addArtist(artist);
    }

    public Artist getArtistById(int id) {
        return oracleDAO.getArtistById(id);
    }

    public List<Artist> getAllArtists() {
        return oracleDAO.getAllArtists();
    }

    public void deleteArtistById(int id) {
        oracleDAO.deleteArtistById(id);
    }

    public Album getAlbumById(int id) {
        return oracleDAO.getAlbumById(id);
    }

    public List<Album> getAlbums() {
        List<Album> albums = oracleDAO.getAlbums();
        for(int i = 0; i< albums.size(); i++ ){
            String rating = oracleDAO.getTotalAlbumRating(albums.get(i).getId());
            albums.get(i).setRating(rating);
        }
        return albums;
    }

    public void createUser(User user) {
        oracleDAO.createUser(user);
    }

    public User getUserByUsername(String username) {
        return oracleDAO.getUserByUsername(username);
    }

    public String getAlbumRating(int albumId, String username) {
        return oracleDAO.getAlbumRating(albumId, username);
    }

    public void setAlbumRating(int albumId, String username, int rating) {
        oracleDAO.setAlbumRating(albumId, username, rating);
    }

    public void deleteAlbumRating(int albumId, String username) {
        oracleDAO.deleteAlbumRating(albumId, username);
    }

    public String getTotalAlbumRating(int albumId) {
        return oracleDAO.getTotalAlbumRating(albumId);
    }

    public void createReview(Review review) {
        User user = oracleDAO.getUserByUsername(review.getUsername());
        review.setUserId(user.getId());
        oracleDAO.createReview(review);
    }

    public Review getAlbumReview(int albumId, String username) {
        User user = oracleDAO.getUserByUsername(username);
        Review review = oracleDAO.getAlbumReview(albumId, user.getId());
        if (review == null) return null;
        String rating = oracleDAO.getAlbumRating(albumId, username);
        review.setUsername(username);
        review.setAlbumId(albumId);
        review.setRating(rating);

        return review;

    }

    public List<Review> getReviews(int albumId) {
        
        List<Review> reviews = oracleDAO.getReviews(albumId);

        for (Review review :
                reviews) {
            String username = oracleDAO.getUserById(review.getUserId()).getUsername();
            String rating = oracleDAO.getAlbumRating(albumId, username);
            String albumName = oracleDAO.getAlbumById(albumId).getTitle();

            review.setUsername(username);
            review.setRating(rating);
            review.setAlbumName(albumName);
        }
        
        
        return reviews;
    }


}
