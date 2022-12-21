---
layout: post
title:  "Red Dot: Blender vs Solidworks"
date:   2022-12-21 14:44:00 +0000
categories: jekyll update
---

# Red Dot Challange.

Search filter "best of the best"
Build PureRef
Select "Basic"

[Red Dot 2022 (003).docx](:/3631a78c926647199d5dc60e3b769b6d)



[RedDot.pur](:/3484d1060c464f8587e9c3c24de99dd1)





![index.png](:/b004f475a50c4b868edc3bab817fbbda)

# Blender workflow
One attempts with  1 minor setback on handle
Duration ~2hrs build and render
Rendering extra 15 min on materials and lights. Uses prebuilt materials from my own asset libary including a PBR wood.
Standard well documented workflow buth in offical documentation and Youtube. Straight down the fairway SubD modeling workflow.
SubD with 1 boolean. No use of bevel or edge weigts that would be typical of a hard surface modeling workflow. Two simple modifiers.

## Step 1 Import ref image

![a00450c700bd732e47305cec8abdd139.png](:/0c93dc6f6d0540dea2ccec57d961befb)

## Step 2 Build out first plane

Shift A to add a new mesh plane. Edit (Tab) flip 90 and scale. then extrude and scale edges to march profile. This was built on the central plane and then from the top view moved into position informed by the shape of the handle seen in other images (informed guesswork)

![7dba8a1664eca4d83a8e2023a19822d8.png](:/d0f7bfa493d14466982d3c73bc883e93)

## Step 3 Build out and mirror
From this first plane the other faces are produced by extruding edges, moving between side, top and perspective view to chech the progression of the form. Geometery is built over the midline for later clipping in the mirror process. The SubD and mirror moifers are added.

![fa0255682efd87660ece224c8dc6c666.png](:/f198fe2398c24e5181c6ec7d38a7c50c)

Apply mirror. Put in support edges to sharpen creases at plane changes in model and control the SubD.
The only real challange here was that some faces got fliped I think. Apply normals didnt work so I had to deleate and rebuild faces but didnt have to remove any verticies so this was trivial. The build out is done in vanilla blender 3.3.0 without the use of boxcutter, hardops booletool or advanced mirror. Does use loop tools and easy HDRI addon. 

## Step 4 Repeat for blade
Same approach used for the blade. The sharpening of the angle of the blade done early berore the support edges are put in to ensure smooth transation. If repeating the process I would not have used mirror but just built out off the midline. 
![41ddd76dd5eebecc493976103322218c.png](:/5d542db92bfb4aed86670c7a0f447f5d)

Used a boolean cut to remove the cutout in the blade.

There is a little bit of pinching at the blade tip (in render) which could be sorted with edge crease and cleaner topo but Its sufficent.  


## Apply materials and render

![179a0d03cea62467b0eea25007172e2e.png](:/c81a79a0eea04fc4ae05d1fdd9f16454)

Scene has 1 area light, and a HDR. Proceedural materials.



![render_ortho.png](:/933ec4e08a3f4fce9461a85750b6c37c)

***

# Solidworks workflow
Two attempts with setbacks on both handle and blade
Duration ~4hrs solidworks
Rendering 30-45 min but needs a lot more work. Uses standard libary materials.
Not a well documented workflow (see later)
Solids only, no surfacing.

## Assembly enviornment
to build a quick model with multiple components with relational features I took a top down approach and modeled in the assembly enviornment. This approach works well but is counter intuitive and not a well documented workflow in SW whereas it is quite common in other modeling and CAD solutions. 
## Start new part
Start new part and edit.

## Import and scale sketch picture
Function works very well but is counter intuitive to use with sketch visability and the command being buried in the menu

## Handle Loft (Take 1)
Built out the handle loft with 3 ref planes and sketches on each plane done by guess work to some degree. In the first step a spline was matched to the top and bottom profile of the handle . This was overbuilt to later trim. Sketches were placed on the refrence planes usint the peirce point constraint to anchor on the guide splines. Loft across the 3 proflies would not work and resulted in twisting despite constraint of guide rail.

Changed to used 3D spline to connect guide rails to each point on the 3 sketches but only use start and end sketch to construct the loft (NB. The middle sketch is used here and a framework to hold the guide rail splines.)

## Handle Loft (Take 2) 
Consrtucted 4 spline curves on the refrence plane which captured each change of plane in the object. More accurate sketches on the 3 planes could then be constructed usint a combinatoin of the peirce point technique and the horizontal constraint functions. 

With the more accurate sketches and guide curves 3D splines could be constructed as guide rails using the manilipuation of the spline control points in the top and side view and wirroring across the plane. In this manner a compleate wireframe of the object is built before the loft is constructed. Again just the first and last sketch are used as the loft with the middle sketch having served its purpose for guide rail construction. All the guidrails are used in the loft. (see image)

![0f2f63b4b1d3d52bdf054cbc7233e82f.png](:/f144d3db34a94b8e9cc4e3d1ada6fad8)

## Blade 
Blade should be a case of consrtucting a sketch using lines and splines to create profile, extrude and then a swept cut to produce the taper to the cutting edge. I could not get the swept cut to work usint the existing geometery (build error with no detail) so I had to construct an arc to aproximate the blade curve as a seperate sketch and run the cut along that. this has inherent inaccuracy but the visable result appears good.

# Keyshot

Render uses the proceedural textures which are Ok but not great. The enviornment light and backdrop are standard. Setting up lights, moving models and etc in keyshot is sloweven using a fast GPU accelerated machine. Would require another split on the blade and a good deal of optimisation of lights and materials to geta photo real or near photoreal result. 

Also. I made a change to the blade and couldnt easily update the geometery in Keyshot. Didnt have the solidworks plugin installed but even that struggles when both sessions are clsoed and reopened. Its not possible with this workflow to adjust geometery based on the appearance of the object under representative lighting conditions. Review if solidworks live rendering can bridge this gap.

---

# Medium Project (Airpods Pro 2020)

## Blender Workflow

3 attempts with  two body approach abandoned as was an approach which attempted to build out from the speaker hole and not use boolean cuts.
Duration ~4hrs build and render
Rendering extra 15 min on materials and lights. 
Standard well documented workflow both in offical documentation and Youtube. Straight down the fairway SubD modeling workflow.
SubD with 2 boolean.
Two simple modifiers.

First serious approach was to build up from stem (square) and then extrude out to form the body. Then apply boolean cuts.

Design work done over refrence images. 
![beffd7cd0a2c909f6ad0c82de33d88df.png](:/ed58e536714d4ef9bd7799c2078363c3)

This was more sucessful than my attempt to model body and stem seperately and them blend. 

![e7dcef9b633ff47a85fa8f67b14c03d6.png](:/8851c30a856348b08054e2080a8f0911)

This repeat model shows the simple buildup prior to applying the subD modifier and making the boolean cuts. 

![a956d94fb92d92a289d510f16c0f9c4e.png](:/53f6dd10e1ca4c888a0de373174faccd)

The render showr the resultant image. To compleat the design a mesh texture or a wireframe modifer could be applied. Render uses cycles and a simple HRDI set up. 


![Medium.png](:/362f35a8c9594c65ad15f43d9c38a1d7)

Main challange was deciding the direction of build out and the alingment of the main body to model it most effictively.

## Solidworks

Building out as two parts ineffictive.
Build as solid loft using guide curves produces an earbud shape but this does not match Airpod Pro. 

![4fa46e39b0ea5ff38ab046ec26f77105.png](:/6ee8608f83894d6aa3226dbd88713f75)

Next move was to look to surface lofts and for this I drew on a video technique from youtube [ turn off the sound](https://www.youtube.com/watch?v=ehKDPBjyf8o) https://www.youtube.com/watch?v=ehKDPBjyf8o using lofted surfaces. I would note that the pods designed here are simplefied and managing the complex angles between the body and the stem is one of the bigger challanges.

To facilitate the solidworks workflow I did some measurement and edist on the base image to set orientation and establish scale.


![markup1.jpg](:/9498954c1f934c0d88e37a999dd7af04)

![9a0e5a447b36152b81a1b6589ddb5fb0.png](:/954bfbfa771a4ff5b604f03a74de81de)

90 minutes in. Marked up drawing, base sketch done and planes constructed. 
![049dc91c579fcc61c78a64aebcac840d.png](:/fc5ce258779e4e678ea2cf0ee680b8f1)

Following on from inserting planes and sketches I constructed the body as a surface loft. Then I constructed the barrel of the airpod again as a surface. Cut both with surfaces (eyeball and adjust later) and lofted a surfaces from those cut surfaces. Important notes were 1. I had to make 3D sketches from the cut surfaces to get the loft to work and used tangency to conrtol the surface blend as attenpts to produce a guide curve failed. 


![Solidworks_Render_3_30hrs.JPG](:/11a633bf7d454ea0acf054665b249c29)



![Screenshot 2022-11-27 092731.jpg](:/620cbcc8ef454a44a91c081cda69ce40)


![Screenshot 2022-11-27 101258.jpg](:/f449a55e6a4e44ce98dfb03d3507213f)



![Screenshot 2022-11-27 092833.jpg](:/b336e82cb7f84c33b03b5fe8828915b5)



![Screenshot 2022-11-27 101258.jpg](:/2582b5ae736544d49371c160609265d7)

Learning points here was the liberal use of sketches to position refrence planes in space when using complex forms without easy orientation cues. 

![3f3035fc5ff50d1bb0b9f2fc774b5bf7.png](:/414e8db15adf444d92169a8e36c87942)

## Overall review of the Airpods
In terms of time and effort the Solidworks build out took over twice as long as the blender here with the blender attempts taking the same in total as the final attempt at solidworks. The Solidworks attempt also benifited from the lessons learned and the conceptual realingment of the part that was crutial in the sucess of the Solidworks build. I do like the crisp finish of the oval cutout in the Solidworks model the control of the blend of the form of the stem into the main body here is not nearly as good as the blender model (you can see this in the reflections).

Critically in terms of form development and creation of new forms the blender workflow allowed for dynamic feedback and visualisation of the form as it developed and was refined whereas the Solidworks required measurement and preplanning of the form to achieve a sucessful result. There is alot more work to be done on both models to bring them up to full finish but I stopped the process here to move on to the final build as the main points of challange have been addressed.
