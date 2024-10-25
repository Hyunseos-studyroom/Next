package main

import (
	"github.com/gin-gonic/gin"
	"math/rand"
	"time"
)

var DB []Feed

type Request struct {
	Title       string `json:"title"`
	Description string `json:"description"`
}

type Feed struct {
	ID          string `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
}

type Response struct {
	ID          string `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
}

func generateRandomNumber() string {
	rand.Seed(time.Now().UnixNano())
	v := rand.Intn(10000)
	return string(v) // 0부터 9999까지의 난수
}

func main() {
	r := gin.Default()

	// GET all feeds
	r.GET("/feed", func(c *gin.Context) {
		c.JSON(200, gin.H{"data": DB})
	})

	// GET feed by ID
	r.GET("/feed/:id", func(c *gin.Context) {
		id := c.Param("id")
		for _, feed := range DB {
			if feed.ID == id {
				c.JSON(200, gin.H{"data": feed})
				return
			}
		}
		c.JSON(404, gin.H{"error": "not found"})
	})

	// POST new feed
	r.POST("/feed", func(c *gin.Context) {
		var req Request
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(400, gin.H{"error": err.Error()})
			return
		}

		newFeed := Feed{
			ID:          generateRandomNumber(),
			Title:       req.Title,
			Description: req.Description,
		}

		DB = append(DB, newFeed)
		c.JSON(201, gin.H{"data": newFeed})
	})

	// PATCH update feed
	r.PATCH("/feed/:id", func(c *gin.Context) {
		id := c.Param("id")
		var req Request
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(400, gin.H{"error": err.Error()})
			return
		}

		for i, feed := range DB {
			if feed.ID == id {
				DB[i].Title = req.Title
				DB[i].Description = req.Description
				c.JSON(200, gin.H{"data": DB[i]})
				return
			}
		}
		c.JSON(404, gin.H{"error": "not found"})
	})

	// DELETE feed
	r.DELETE("/feed/:id", func(c *gin.Context) {
		id := c.Param("id")
		for i, feed := range DB {
			if feed.ID == id {
				DB = append(DB[:i], DB[i+1:]...) // remove the feed
				c.JSON(204, gin.H{})
				return
			}
		}
		c.JSON(404, gin.H{"error": "not found"})
	})

	r.Run(":8080") // Run the server on port 8080
}
