document.addEventListener("DOMContentLoaded", () => {
    // Set current year in footer
    document.getElementById("current-year").textContent = new Date().getFullYear()
  
    // Navbar scroll effect
    const navbar = document.getElementById("navbar")
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled")
      } else {
        navbar.classList.remove("scrolled")
      }
    })
  
    // Mobile menu toggle
    const menuToggle = document.querySelector(".mobile-menu-toggle")
    const mobileNav = document.querySelector(".mobile-nav")
    const menuIcon = document.querySelector(".menu-icon")
    const closeIcon = document.querySelector(".close-icon")
  
    menuToggle.addEventListener("click", () => {
      mobileNav.classList.toggle("hidden")
      menuIcon.classList.toggle("hidden")
      closeIcon.classList.toggle("hidden")
    })
  
    // Close mobile menu when clicking on a link
    const mobileNavLinks = document.querySelectorAll(".mobile-nav-links a")
    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.add("hidden")
        menuIcon.classList.remove("hidden")
        closeIcon.classList.add("hidden")
      })
    })
  
    // Hexagon background animation
    const canvas = document.getElementById("hexagon-background")
    const ctx = canvas.getContext("2d")
  
    // Set canvas dimensions
    function setCanvasDimensions() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
  
    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)
  
    // Hexagon properties
    const hexSize = 30
    const hexHeight = hexSize * Math.sqrt(3)
    const hexWidth = hexSize * 2
    const hexVerticalOffset = hexHeight * 0.75
    const hexHorizontalOffset = hexWidth * 0.5
  
    // Colors
    const blueColor = "rgba(59, 130, 246, 0.1)"
    const orangeColor = "rgba(249, 115, 22, 0.1)"
  
    // Draw hexagon
    function drawHexagon(x, y, color) {
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i
        const xPos = x + hexSize * Math.cos(angle)
        const yPos = y + hexSize * Math.sin(angle)
        if (i === 0) {
          ctx.moveTo(xPos, yPos)
        } else {
          ctx.lineTo(xPos, yPos)
        }
      }
      ctx.closePath()
      ctx.strokeStyle = color
      ctx.lineWidth = 1
      ctx.stroke()
    }
  
    // Animation variables
    let animationFrameId
    let time = 0
  
    // Animation function
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.005
  
      // Calculate rows and columns needed to fill the screen
      const cols = Math.ceil(canvas.width / hexHorizontalOffset) + 2
      const rows = Math.ceil(canvas.height / hexVerticalOffset) + 2
  
      // Draw hexagons
      for (let row = -2; row < rows; row++) {
        for (let col = -2; col < cols; col++) {
          const x = col * hexHorizontalOffset + (row % 2 === 0 ? 0 : hexHorizontalOffset / 2)
          const y = row * hexVerticalOffset
  
          // Add some movement based on time
          const offsetX = Math.sin(time + row * 0.1 + col * 0.1) * 5
          const offsetY = Math.cos(time + row * 0.1 + col * 0.1) * 5
  
          // Alternate colors
          const color = (row + col) % 2 === 0 ? blueColor : orangeColor
  
          drawHexagon(x + offsetX, y + offsetY, color)
        }
      }
  
      animationFrameId = requestAnimationFrame(animate)
    }
  
    // Start animation
    animate()
  
    // Contact form handling
    const contactForm = document.getElementById("contact-form")
    const formStatus = document.getElementById("form-status")
  
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Get form data
        const name = document.getElementById("name").value
        const email = document.getElementById("email").value
        const message = document.getElementById("message").value
  
        // Simulate form submission
        formStatus.classList.remove("hidden", "success", "error")
        formStatus.textContent = "Sending..."
  
        // Simulate API call with timeout
        setTimeout(() => {
          // Simulate successful submission
          formStatus.textContent = "Message sent successfully! I'll get back to you soon."
          formStatus.classList.add("success")
  
          // Reset form
          contactForm.reset()
  
          // Hide status after 5 seconds
          setTimeout(() => {
            formStatus.classList.add("hidden")
          }, 5000)
        }, 1500)
      })
    }
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        if (targetId === "#") return
  
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
          })
        }
      })
    })
  })
  
  