package com.netcracker.Objects;

import java.util.Date;

public class Album {

    private int id;
    private String artistName;
    private String title;
    private int year;
    private String description;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getArtistName() {
        return artistName;
    }

    public void setArtistName(String artistName) {
        this.artistName = artistName;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "Album{" +
                "id=" + id +
                ", artistName='" + artistName + '\'' +
                ", title='" + title + '\'' +
                ", year=" + year +
                ", description='" + description + '\'' +
                '}';
    }
}
